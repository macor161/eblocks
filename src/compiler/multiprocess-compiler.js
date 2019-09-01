const debug = require('debug')('multiprocess-compiler')
const os = require('os')
const { spawn } = require('child_process')
const { DependencyTree } = require('../dependency-tree')
const Worker = require('./worker')
const { dispatchWork } = require('./dispatch-work')
const { CompilerResultsMerger } = require('./compiler-results-merger')

const cpus = os.cpus()

/**
 * Compiler using multiple solc processes in parallel
 * @param {Object} options
 * @param {Object} options.solcOptions Compiler options
 * @param {string} options.version Compiler version
 * @param {function} options.onUpdate Update callback
 */
class MultiprocessCompiler {
  constructor(options) {
    this._solcOptions = options.solcOptions
    this._version = options.version
    this._onUpdate = options.onUpdate
  }

  async compile(sources) {
    const workers = this._initWorkers(this._version, this._solcOptions)
    const dependencyTree = new DependencyTree()

    for (const key in sources)
      dependencyTree.addFile(sources[key])

    const batches = dispatchWork(dependencyTree, cpus.length)

    for (const [i, batch] of batches.entries()) {
      const worker = workers[i]

      for (const branch of batch.getBranches())
        worker.addSource(branch)
    }

    const results = await this._runWorkers(
      workers.filter(worker => worker.hasSources()),
      this._onUpdate,
    )
    const merger = new CompilerResultsMerger(results)

    workers.forEach(worker => worker.close())
    return merger.getResults()
  }


  async _runWorkers(workers, onUpdate = () => null) {
    onUpdate(workers.map(worker => worker.getState()))

    return Promise.all(
      workers
        .map(async worker => {
          const result = await worker.compile()
          onUpdate(workers.map(w => w.getState()))
          return result
        }),
    )
  }

  /**
   * Returns as many workers as cpu available.
   * First worker is not creating a child process.
   */
  _initWorkers(solcVersion, options) {
    return cpus
      .map((cpu, index) => new Worker({ version: solcVersion, id: index, compilerOptions: options }))
  }
}


module.exports = { MultiprocessCompiler }

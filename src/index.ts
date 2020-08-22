import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import * as inquirer from 'inquirer'
import {triggers, runsOnParameters} from './data'
import {arrayNotEmpty, createYaml, toTitle} from './utils'
import * as fs from 'fs'
import * as YAML from 'yaml'

class InitActions extends Command {
  static description = 'Initialize your GitHub Actions workflows easily!'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    directory: flags.string({char: 'd', description: 'directory of the output workflow .yml'}),
  }

  async run() {
    const {flags} = this.parse(InitActions)

    this.log('hello from init-actions!')
    const directory = flags.directory ?? '.github/workflows'
    const file = await cli.prompt('Name of the workflow file?', {default: 'main'})
    const name = await cli.prompt('Name of the workflow?', {default: toTitle(file)})
    const {trigger} = await inquirer.prompt([{
      name: 'trigger',
      message: 'Select a trigger',
      type: 'list',
      choices: [{name: 'push'}, {name: 'pull-request'}, {name: 'issues'}],
    }])
    const triggerName = triggers[trigger]
    const activityTypes = triggerName?.activityTypes
    const {activity} = arrayNotEmpty(activityTypes) ? await inquirer.prompt([{
      name: 'activity',
      message: 'Select an activity',
      type: 'list',
      choices: activityTypes?.map((t: string) => ({name: t})),
    }]) : {activity: null}
    const {runsOn} = await inquirer.prompt([{
      name: 'runsOn',
      message: 'In which platform your workflow wil run?',
      type: 'list',
      choices: runsOnParameters.map(t => ({name: t})),
    }])
    const jobName = await cli.prompt('Name of the initial job?', {default: 'deploy'})
    if (!fs.existsSync(directory)) fs.mkdirSync(directory, {recursive: true})
    const output = createYaml(name, trigger, activity, jobName, runsOn)
    fs.writeFile(`${directory}/${file}.yml`, YAML.stringify(output), err => {
      if (err) return this.log(err.message)
      this.log(`${name} workflow file created at > ${file}.yml`)
    })
  }
}

export = InitActions

import * as YAML from 'yaml'

export const toTitle = (fileName: string) => fileName.split(/[^A-Za-z]/)
.map(word => word.charAt(0).toUpperCase() + word.slice(1))
.join(' ')

export const arrayNotEmpty = (array: any[]) => array && array.length > 0

export const createYaml = (
  name: string,
  trigger: string,
  activity: string,
  jobName: string,
  runsOn: string): string => {
  const config = {
    name,
    on: activity ? {[trigger]: {types: [activity]}} : trigger,
    jobs: {[jobName]: {name: toTitle(jobName), 'runs-on': runsOn, steps: [{uses: 'actions/checkout@v2'}]}},
  }
  return YAML.stringify(config)
}

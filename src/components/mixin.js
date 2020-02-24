import { extend } from 'vee-validate'

export default extend('name', value => {
  return value === ''
})

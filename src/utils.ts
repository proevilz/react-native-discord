import { HubCallback, HubCapsule } from '@aws-amplify/core'
import isEmail from 'validator/lib/isEmail'
import * as RootNavigation from '../src/Navigation/RootNavigation'
export const statusIdToString = (status: number) => {
  switch (status) {
    case 1:
      return 'Online'
    case 2:
      return 'Offline'
    case 3:
      'Do Not Disturb'
    default:
      return 'Idle'
  }
}
export interface IFormState {
  [key: string]: {
    error: null | string
    value: string
    validate: (value: string) => boolean
  }
}

interface IValidateField {
  form: IFormState
  setForm: React.Dispatch<React.SetStateAction<IFormState>>
}
export const validateField = ({ form, setForm }: IValidateField): boolean => {
  interface IErrors {
    email: null | string
    password: null | string
    newPassword: null | string
  }
  const errors: IErrors = {
    email: null,
    password: null,
    newPassword: null,
  }

  if (form.password.value !== form.newPassword.value) {
    errors.password = 'Passwords do not match'
    errors.newPassword = 'Passwords do not match'
  } else if (!form.password.validate(form.password.value)) {
    errors.password =
      'Password must contain the following characters: uppercase, lowercase, number, symbol and be 8 characters in length'
  } else if (!form.password.validate(form.newPassword.value)) {
    errors.newPassword =
      'Password must contain the following characters: uppercase, lowercase, number, symbol and be 8 characters in length'
  }

  if (!form.email.validate(form.email.value)) {
    errors.email = 'Email is not valid'
  }

  setForm((prev) => ({
    ...prev,
    email: {
      ...prev.email,
      error: errors.email,
    },
    password: {
      ...prev.password,
      error: errors.password,
    },
    newPassword: {
      ...prev.newPassword,
      error: errors.newPassword,
    },
  }))
  if (
    errors.email === null &&
    errors.password === null &&
    errors.newPassword === null
  ) {
    return true
  } else {
    return false
  }
}

export const hubListener = (data: HubCapsule) => {
  switch (data.payload.event) {
    case 'signIn':
      console.log('sign in! ', data.payload.data)
      break
    case 'signUp':
      break
    case 'signOut':
      break
    case 'signUp_failure':
      if (data.payload.data.name === 'UsernameExistsException') {
      }
      break
    case 'signIn_failure':
      break
    case 'tokenRefresh':
      break
    case 'tokenRefresh_failure':
      break
    case 'autoSignIn':
      console.log('autoSignIn')
      break
    case 'autoSignIn_failure':
      console.log('autoSignInFailure')
      break
    case 'configured':
  }
}

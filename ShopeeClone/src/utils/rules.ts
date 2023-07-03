import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// export const rules: Rules = {
//   email: {
//     required: {
//       value: true,
//       message: 'Email là bắt buôc.'
//     },
//     pattern: {
//       value: /^\S+@\S+\.\S+$/,

//       message: 'Email không đúng định dạng.'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài từ 5 - 160 ký tự'
//     },
//     minLength: {
//       value: 5,
//       message: 'Độ dài từ 5 - 160 ký tự'
//     }
//   },
//   password: {
//     required: {
//       value: true,
//       message: 'Password là bắt buôc.'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài từ 6 - 160 ký tự'
//     },
//     minLength: {
//       value: 6,
//       message: 'Độ dài từ 6 - 160 ký tự'
//     }
//   },
//   confirm_password: {
//     required: {
//       value: true,
//       message: 'Nhập lại password là bắt buôc.'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài từ 6 - 160 ký tự'
//     },
//     minLength: {
//       value: 6,
//       message: 'Độ dài từ 6 - 160 ký tự'
//     }
//   }
// }

// truyền function thay vì rules:
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email là bắt buôc.'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,

      message: 'Email không đúng định dạng.'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 - 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5 - 160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password là bắt buôc.'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhập lại password là bắt buôc.'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    // trong trường hợp có truyền getValues -> check password
    // trong trường hợp không truyền getValues -> không có option validate -> undefined
    validate:
      typeof getValues === 'function'
        ? (value) => {
            // value là giá trị của confirm_password:
            if (value === getValues('password')) {
              return true
            }
            return 'Nhập lại password không khớp.'
          }
        : undefined
  }
})

// cách 2: sử dụng Schema validation với yup:
export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc.')
    .email('Email không đúng định dạng.')
    .min(5, 'Độ dài từ 5 - 160 ký tự')
    .max(160, 'Độ dài từ 5 - 160 ký tự'),

  password: yup
    .string()
    .required('Password là bắt buộc.')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự'),

  confirm_password: yup
    .string()
    .required('Nhập lại password là bắt buôc.')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .oneOf([yup.ref('password'), 'Nhập lại password không khớp.'])
})

// với login thì schema không cần có confirm password
const loginSchema = schema.omit(['confirm_password'])

export type Schema = yup.InferType<typeof schema>
export type LoginSchema = yup.InferType<typeof loginSchema>

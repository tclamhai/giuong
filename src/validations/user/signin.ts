export const signInSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      pattern: '^[a-zA-Z0-9._]+@[a-zA-Z0-9._]+$',
      errorMessage: {
        type: '${/email} Vui lòng nhập kiểu string',
        pattern: '${/email} Nhập đúng định dạng email'
      }
    },
    password: {
      type: 'string',
      errorMessage: {
        type: '${/password} Vui lòng nhập kiểu string'
      }
    }
  },
  additionalProperties: {
    not: true,
    errorMessage: 'Giá trị không được chấp nhận:  ${0#}'
  },
  errorMessage: {
    type: 'should be an object',
    required: {
      email: 'Vui lòng nhập địa chỉ email',
      password: 'Vui lòng nhập mật khẩu'
    }
  }
};

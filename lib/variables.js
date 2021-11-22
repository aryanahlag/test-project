export const bearerAuth = (context) => {
  return {Authorization: 'Bearer '+context.$cookies.get('token')}
}

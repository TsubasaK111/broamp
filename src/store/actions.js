const timeApiUrl = `http://json-time.appspot.com/time.json?callback=?`

export const actions = {
  getTime(context) {
    console.log('getting time...')

    fetch(`${timeApiUrl}`)
      .then(response => {
        console.log(response)
        return response
      })
      .then(response => response.json())
      .then(body => {
        context.commit('setTime', body.datetime);
      })
      .catch(error => { throw Error(error) });
  },
}
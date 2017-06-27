/**
 * Created by linwh on 2017/6/19.
 */

const apiHost = 'https://api-testesports.alisports.com';

module.exports = Object.assign({}, {
  apiURL: {
    sendsms:`${apiHost}/h5/sendsms`,
    captcha:`${apiHost}/h5/captcha`,
    login:`${apiHost}/h5/login`,
    guessMatch:`${apiHost}/h5/guess/match`,
    bet:`${apiHost}/h5/betting`,
    match:`${apiHost}/h5/match`,
    rank:`${apiHost}/h5/guess_rank`,
  }
});

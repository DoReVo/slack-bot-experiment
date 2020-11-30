import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SlackApp from 'App/Models/SlackApp'
import OauthValidator from 'App/Validators/OauthValidator'
import Axios from 'axios'
import Logger from '@ioc:Adonis/Core/Logger'

export default class SlackOauthController {
  public async handle({ request, params }: HttpContextContract) {
    // Find slack app or fail
    const slackApp = await SlackApp.findOrFail(params.id)
    // Data
    const { code } = await request.validate(OauthValidator)
    // URL with data
    const url = `https://slack.com/api/oauth.v2.access?code=${encodeURI(
      code
    )}&client_id=${encodeURI(slackApp.clientId)}&client_secret=${encodeURI(slackApp.clientSecret)}`
    Logger.info(`Getting OAuth token`)
    // Get Oauth token
    const { data } = await Axios.post(url)
    Logger.info(data)
    // Save access token
    await slackApp
      .related('oAuthToken')
      .create({ token: data.access_token, workspaceId: data.team.id, botUserId: data.bot_user_id })
    return { msg: 'App successfully installed' }
  }
}

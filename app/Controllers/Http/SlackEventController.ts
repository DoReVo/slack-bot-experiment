import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import ChannelUser from 'App/Models/ChannelUser'
import SlackApp from 'App/Models/SlackApp'
import SlackOauthToken from 'App/Models/SlackOauthToken'
import Axios from 'axios'

export default class SlackEventController {
  public async handle({ request, params }: HttpContextContract) {
    // Find app
    await SlackApp.findOrFail(params.id)
    // Get type
    const event: Webhook = request.all() as Webhook
    // For webhook URL verification
    if (event.type === 'url_verification') {
      Logger.info(`Received challenge request from slack`)
      const challenge = request.input('challenge')
      return challenge
    }
    // For subscribed event webhook
    if (event.type === 'event_callback') {
      const url = 'https://slack.com/api/chat.postMessage'
      // Check if user is already registered in DB
      const channelUser: ChannelUser | null = await ChannelUser.findBy('slackId', event.event.user)
      // Find oauth token related to the workspace
      const oauthToken = await SlackOauthToken.findBy('workspaceId', event.event.team)
      const headers = {
        Authorization: `Bearer ${oauthToken!.token}`,
      }
      // Check if request is for bot event_callback
      if (oauthToken?.botUserId === event.event.user) {
        Logger.info('Received webhook for bot, stopping algorithm')
        // Just reply Ok
        return { msg: 'Ok' }
      }
      // If user not registered,
      // Create new user
      if (!channelUser) {
        const createdUser = await oauthToken?.related('users').create({ slackId: event.event.user })
        Logger.info(
          `Creating new user, User ID: ${createdUser!.id} Slack ID: ${createdUser!.slackId}`
        )
        // Data to reply
        const message = `Welcome to this SlackApp, your UserId is ${createdUser!.id}`
        const dataToSend = {
          channel: createdUser!.slackId,
          text: message,
        }
        await Axios.post(url, dataToSend, { headers })
      } else {
        // If user is already created

        // Data to reply
        const message = `Message received, Thank you.`
        const dataToSend = {
          channel: channelUser.slackId,
          text: message,
        }
        await Axios.post(url, dataToSend, { headers })
      }
      return { msg: 'Ok' }
    }
  }
}

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SlackApp from 'App/Models/SlackApp'
import AppValidator from 'App/Validators/AppValidator'
export default class ChannelController {
  public async store({ request }: HttpContextContract) {
    const data = await request.validate(AppValidator)
    // Create new entry
    const slackApp = await SlackApp.create(data)

    return slackApp
  }
}

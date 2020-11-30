import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
export default class ChallengeController {
  public async handle({ request }: HttpContextContract) {
    // Get type
    const type = request.input('type')

    if (type === 'url_verification') {
      Logger.info(`Received challenge request from slack`)
      const challenge = request.input('challenge')
      return challenge
    }
  }
}

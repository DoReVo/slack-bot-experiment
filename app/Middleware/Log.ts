import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
export default class Log {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    Logger.info(`${request.method()} ${request.url()}`)
    Logger.info(request.all() as any)
    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
  }
}

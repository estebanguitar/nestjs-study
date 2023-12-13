import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    // constructor(
    //     @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
    //     private readonly jwtService: JwtService
    // ) {}

    // async join(username: string, password: string): Promise<Auth> {
    //     this.authRepository.findOne({
    //         where: {
    //             username
    //         }
    //     }).then(user => {
    //         if(user !== null)
    //             throw new HttpException('Already Exist username', HttpStatus.BAD_REQUEST)
    //     })

    //     return await this.authRepository.save(
    //         this.authRepository.create({
    //             username,
    //             password: aesEncrypt(password),
    //             createdAt: new Date()
    //         })
    //     )
    // }

    // async signin(username: string, password: string): Promise<{ accessToken: string }> {
    //     const user = await this.authRepository.findOne({
    //         where: {
    //             username,
    //         }
    //     })

    //     if(user === null || aesDecrypt(user?.password) !== password) 
    //         throw new HttpException('There is no user', HttpStatus.BAD_REQUEST)

    //     const now = new Date().getTime()
        
    //     const payload = { 
    //         username : user.username,  
    //         timestamp : now
    //     }

    //     const accessToken = this.jwtService.sign(payload, {
    //         algorithm: 'HS256',
    //     });

    //     return { accessToken }
    // }

}


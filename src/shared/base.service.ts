export abstract class BaseService {

    constructor(private readonly name: string) {
        console.debug(BaseService.name, name);
    }

}
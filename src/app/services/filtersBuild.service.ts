import { Injectable } from '@angular/core';
import { ConfigService } from "../config/config.service";
import { RootObject } from '../interfaces/listModel.interface';


@Injectable()
export class FiltersBuildService {
    constructor(private configService: ConfigService) {}

    attributesEndPoint: String = '/api/getAllAttributes'
    racesEndPoint: String = '/api/getAllRaces'
    typesEndPoint: String = '/api/getAllTypes'

    getAllAttributes(){
        return this.configService.get(this.attributesEndPoint)
    }

    getAllRaces(param:String){
        return this.configService.getWithQueryParams(this.racesEndPoint, param)
    }

    getAllTypes(flag:boolean){
        return this.configService.getWithparams(this.typesEndPoint, flag)
    }
    
}
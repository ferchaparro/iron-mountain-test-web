import { Injectable } from '@angular/core'
import { keywords } from '../../constants'

@Injectable({providedIn: 'root'})
export class CookiesService {
    constructor(){}

    put(key: string, value: string) {
        localStorage.setItem(key, value)
    }

    get(key: string) {
        return localStorage.getItem(key)
    }

    remove(key: string) {
        localStorage.removeItem(key)
    }

    logout() {
        this.remove(keywords.AUTH_KEY)
    }
}

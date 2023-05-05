import {clientRequest} from '../utils/axiosClients' 

interface Note{
    title: string
    description: string
}

export default class NoteService{

    static addNote(note: Note){
        return clientRequest({
            method:'post',
            url: '/notes',
            data: note
        })
    }

    static getAllNotes(){
        return clientRequest({
            method:'get',
            url:'/notes'
        })
    }

    static editNote(id:number, note: Note){
        return clientRequest({
            method:'put',
            url: `/notes/${id}`,
            data: note
        })
    }

}
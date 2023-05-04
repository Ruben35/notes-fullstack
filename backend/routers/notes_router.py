from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List
from services.notes_service import NotesService
from models.note import NoteModel
from middlewares.jwt_bearer import JWTBearer

notes_router = APIRouter()


@notes_router.get('/notes', tags=["Notes"], response_model=List[NoteModel], status_code=200)
def get_all_notes(user_id=Depends(JWTBearer())) -> List[NoteModel]:
    result = NotesService().get_notes(user_id)
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@notes_router.post('/notes', tags=["Notes"], response_model=dict, status_code=201)
def create_new_note(note: NoteModel, user_id=Depends(JWTBearer())) -> dict:
    allOk = NotesService().create_new_note(note, user_id)
    if not allOk:
        return JSONResponse(status_code=409, content={'message': 'Note title duplication'})
    return JSONResponse(status_code=201, content={'message': 'Note added succesfully'})


@notes_router.get('/notes/{id}', tags=["Notes"], response_model=NoteModel, status_code=200)
def get_note_by_id(id: int, user_id=Depends(JWTBearer())) -> NoteModel:
    result = NotesService().get_note_by_id(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': 'Note not founded'})
    if result.user_id != user_id:
        return JSONResponse(status_code=401, content={'message': 'User not authorized to get this note'})
    return JSONResponse(status_code=200, content={'id': result.id, 'title': result.title, 'description': result.description})


@notes_router.put('/notes/{id}', tags=["Notes"], response_model=dict, status_code=200)
def update_note_by_id(id: int, note: NoteModel, user_id=Depends(JWTBearer())) -> dict:
    allOk, reason = NotesService().update_note_by_id(id, note, user_id)
    if not allOk:
        if reason == 'NotFound':
            return JSONResponse(status_code=404, content={'message': 'Note not founded'})
        if reason == 'Duplicate':
            return JSONResponse(status_code=409, content={'message': 'Note title duplication'})
        else:
            return JSONResponse(status_code=401, content={'message': 'User not authorized to modify this note'})
    return JSONResponse(status_code=200, content={'message': 'Note modified'})


@notes_router.delete('/notes/{id}', tags=["Notes"], response_model=dict, status_code=200)
def delete_note_by_id(id: int, user_id=Depends(JWTBearer())) -> dict:
    allOk, reason = NotesService().delete_note_by_id(id, user_id)
    if not allOk:
        if reason == 'NotFound':
            return JSONResponse(status_code=404, content={'message': 'Note not founded'})
        else:
            return JSONResponse(status_code=401, content={'message': 'User not authorized to delete this note'})
    return JSONResponse(status_code=200, content={'message': 'Note deleted'})

from config.database import Session
from models.note import Note, NoteModel
from sqlalchemy.orm import load_only


class NotesService():
    def __init__(self) -> None:
        self.db = Session()

    def get_notes(self, user_id):
        query = self.db.query(Note).filter(Note.user_id == user_id).options(
            load_only(Note.id, Note.title, Note.description)).all()
        self.db.close()

        return query

    def create_new_note(self, note: NoteModel, user_id: int):
        titleExist = self.db.query(Note).filter(
            Note.title == note.title, Note.user_id == user_id).first()
        if titleExist:
            return False
        new_note = Note(**note.dict())
        new_note.user_id = user_id
        self.db.add(new_note)
        self.db.commit()
        self.db.close()

        return True

    def get_note_by_id(self, id: int):
        query = self.db.query(Note).filter(Note.id == id).first()
        self.db.close()
        return query

    def update_note_by_id(self, id: int, note: NoteModel, user_id: int):
        noteToModify = self.db.query(Note).filter(Note.id == id).first()
        if not noteToModify:
            return False, 'NotFound'
        if noteToModify.user_id != user_id:
            return False, 'NotAuthorized'
        titleExist = self.db.query(Note).filter(
            Note.title == note.title, Note.id != id, Note.user_id == user_id).first()
        if titleExist:
            return False, 'Duplicate'
        noteToModify.title = note.title
        noteToModify.description = note.description
        self.db.commit()
        self.db.close()

        return True, ''

    def delete_note_by_id(self, id: int, user_id: int):
        noteToDelete = self.db.query(Note).filter(Note.id == id).first()
        if not noteToDelete:
            return False, 'NotFound'
        if noteToDelete.user_id != user_id:
            return False, 'NotAuthorized'
        self.db.delete(noteToDelete)
        self.db.commit()
        self.db.close()

        return True, ''

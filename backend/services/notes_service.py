from config.database import Session
from models.note import Note, NoteModel
from sqlalchemy.orm import load_only


class NotesService():
    def __init__(self) -> None:
        self.db = Session()

    def get_notes(self, user_id):
        return self.db.query(Note).filter(Note.user_id == user_id).options(load_only(Note.id, Note.title, Note.description)).all()

    def create_new_note(self, note: NoteModel, user_id: int):
        titleExist = self.db.query(Note).filter(
            Note.title == note.title, Note.user_id == user_id).first()
        if titleExist:
            return False
        new_note = Note(**note.dict())
        new_note.user_id = user_id
        self.db.add(new_note)
        self.db.commit()
        return True

    def get_note_by_id(self, id: int):
        return self.db.query(Note).filter(Note.id == id).first()

    def update_note_by_id(self, id: int, note: NoteModel):
        noteToModify = self.db.query(Note).filter(Note.id == id).first()
        if not noteToModify:
            return False, 'NotFound'
        titleExist = self.db.query(Note).filter(
            Note.title == note.title, Note.id != id).first()
        if titleExist:
            return False, 'Duplicate'
        noteToModify.title = note.title
        noteToModify.description = note.description
        self.db.commit()
        return True, ''

    def delete_note_by_id(self, id: int):
        noteToDelete = self.db.query(Note).filter(Note.id == id).first()
        if not noteToDelete:
            return False
        self.db.delete(noteToDelete)
        self.db.commit()
        return True

from Api.Users.usersRouter import router
from Handlers.BaseHandler import LoginHandler


@router.post("/login")
def login(login, password):
    result = LoginHandler().run_core({"login": login, "password": password})
    if result["is_ok"]:
        return {"is_ok": True, "token": result["token"]}
    else:
        return {"is_ok": False, "error": result["error"]}
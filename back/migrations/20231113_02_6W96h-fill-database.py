"""
fill database
"""

from yoyo import step

__depends__ = {'20231113_01_BOVzn-create-database'}

steps = [
    # Заполнение таблицы Organizations
    step("""
    INSERT INTO Organizations ("organizationID", "title", "address", "telephoneNumber") 
    VALUES ('550e8400-e29b-41d4-a716-446655440000', 'Organization 1', 'Address 1', '123456789');
    """),

    # Заполнение таблицы Users
    step("""
    INSERT INTO Users ("userID", "email", "login", "passwordHash", "roleID", "telegram", "telephoneNumber", "organizationID") 
    VALUES ('550e8400-e29b-41d4-a716-446655440001', 'user1@example.com', 'user', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2', 1, 'telegram_user1', '987654321', '550e8400-e29b-41d4-a716-446655440000');
    """),

    # Заполнение таблицы Subscriptions
    step("""
    INSERT INTO Subscriptions ("subscriptionID", "startDate", "endDate", "price", "version", "organizationID") 
    VALUES ('550e8400-e29b-41d4-a716-446655440002', '2023-01-01', '2023-12-31', 100, 1, '550e8400-e29b-41d4-a716-446655440000');
    """),

    # Заполнение таблицы Dangers
    step("""
    INSERT INTO Dangers ("dangerID", "title", "description", "imgUrl", "price") 
    VALUES ('550e8400-e29b-41d4-a716-446655440003', 'Холодное оружие', 'Холодное оружие или Белое оружие — военное, охотничье или спортивное оружие, в котором не используется сила горюче-взрывчатых веществ, сжатого газа, электричества и так далее. Бо́льшая часть холодного оружия — это ручное оружие.', 'cold-weapon.jpg', 5000);
    """),

    # Заполнение таблицы Modules
    step("""
    INSERT INTO Modules ("moduleID", "subscriptionID", "dangerID") 
    VALUES ('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003');
    """),

    # Заполнение таблицы Specifications
    step("""
    INSERT INTO Specifications ("specificationsID", "darkMode", "model", "motionSensor", "resolution") 
    VALUES ('550e8400-e29b-41d4-a716-446655440005', TRUE, 'Model 1', TRUE, '1920x1080');
    """),

    # Заполнение таблицы Cameras
    step("""
    INSERT INTO Cameras ("cameraID", "address", "location", "specificationsID", "organizationID") 
    VALUES ('550e8400-e29b-41d4-a716-446655440006', 'Address 1', 'Location 1', '550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440000');
    """),

    # Заполнение таблицы Events
    step("""
    INSERT INTO Events ("eventID", "dateTime", "imgID", labels, "cameraID", "note", "isImportant")
    VALUES ('550e8400-e29b-41d4-a716-446655440057', '2023-01-01 12:00:00', 'event1.jpg', '{}', '550e8400-e29b-41d4-a716-446655440006', 'привет, мир!', true);
    """),
]

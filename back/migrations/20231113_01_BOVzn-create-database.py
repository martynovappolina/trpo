"""
create-database
"""

from yoyo import step

__depends__ = {}

steps = [
    # Создание таблицы Organizations
    step("""
    CREATE TABLE Organizations (
        organizationID uuid PRIMARY KEY,
        title varchar(32) NOT NULL,
        address varchar(32),
        telephoneNumber varchar(32)
    );
    """),

    # Создание таблицы Users
    step("""
        CREATE TABLE Users (
            userID uuid PRIMARY KEY,
            email varchar(32) NOT NULL,
            login varchar(32) NOT NULL,
            passwordHash varchar(255) NOT NULL,
            roleID int NOT NULL,
            telegram varchar(32),
            telephoneNumber varchar(32),
            organizationID uuid REFERENCES Organizations(organizationID)
        );
    """),

    # Создание таблицы Subscriptions
    step("""
        CREATE TABLE Subscriptions (
            subscriptionID uuid PRIMARY KEY,
            startDate date NOT NULL,
            endDate date NOT NULL,
            price int NOT NULL,
            version int NOT NULL,
            organizationID uuid REFERENCES Organizations(organizationID)
        );
    """),

    # Создание таблицы Dangers
    step("""
    CREATE TABLE Dangers (
        dangerID uuid PRIMARY KEY,
        title varchar(32) NOT NULL,
        description varchar(255),
        imgUrl varchar(32),
        price int NOT NULL
    );
    """),

    # Создание таблицы Modules
    step("""
        CREATE TABLE Modules (
            moduleID uuid PRIMARY KEY,
            subscriptionID uuid REFERENCES Subscriptions(subscriptionID),
            dangerID uuid REFERENCES Dangers(dangerID)
        );
    """),

    #Создание таблицы Specifications
    step("""
        CREATE TABLE Specifications (
          specificationsID uuid PRIMARY KEY,
          darkMode boolean NOT NULL,
          model varchar(255) NOT NULL,
          motionSensor boolean NOT NULL,
          resolution varchar(255) NOT NULL
        );
    """),

    # Создание таблицы Cameras
    step("""
        CREATE TABLE Cameras (
            cameraID uuid PRIMARY KEY,
            address varchar(32),
            location varchar(32),
            specificationsID uuid REFERENCES Specifications(specificationsID),
            organizationID uuid REFERENCES Organizations(organizationID)
        );
    """),

    # Создание таблицы Events
    step("""
    CREATE TABLE Events (
        eventID int PRIMARY KEY,
        dateTime date NOT NULL,
        imgUrl varchar(32),
        labels json,
        cameraID uuid REFERENCES Cameras(cameraID),
        dangerID uuid REFERENCES Dangers(dangerID)
    );
    """),
]

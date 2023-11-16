"""
create-database
"""

from yoyo import step

__depends__ = {}

steps = [
    # Создание таблицы Organizations
    step("""
    CREATE TABLE Organizations (
        "organizationID" uuid PRIMARY KEY,
        "title" character varying NOT NULL,
        "address" character varying,
        "telephoneNumber" character varying
    );
    """),

    # Создание таблицы Users
    step("""
        CREATE TABLE Users (
            "userID" uuid PRIMARY KEY,
            "email" character varying NOT NULL,
            "login" character varying NOT NULL,
            "passwordHash" character varying NOT NULL,
            "roleID" int NOT NULL,
            "telegram" character varying,
            "telephoneNumber" character varying,
            "organizationID" uuid REFERENCES Organizations("organizationID")
        );
    """),

    # Создание таблицы Subscriptions
    step("""
        CREATE TABLE Subscriptions (
            "subscriptionID" uuid PRIMARY KEY,
            "startDate" date NOT NULL,
            "endDate" date NOT NULL,
            "price" int NOT NULL,
            "version" int NOT NULL,
            "organizationID" uuid REFERENCES Organizations("organizationID")
        );
    """),

    # Создание таблицы Dangers
    step("""
    CREATE TABLE Dangers (
        "dangerID" uuid PRIMARY KEY,
        "title" character varying NOT NULL,
        "description" character varying,
        "imgUrl" character varying,
        "price" int NOT NULL
    );
    """),

    # Создание таблицы Modules
    step("""
        CREATE TABLE Modules (
            "moduleID" uuid PRIMARY KEY,
            "subscriptionID" uuid REFERENCES Subscriptions("subscriptionID"),
            "dangerID" uuid REFERENCES Dangers("dangerID")
        );
    """),

    #Создание таблицы Specifications
    step("""
        CREATE TABLE Specifications (
          "specificationsID" uuid PRIMARY KEY,
          "darkMode" boolean NOT NULL,
          "model" character varying NOT NULL,
          "motionSensor" boolean NOT NULL,
          "resolution" character varying NOT NULL
        );
    """),

    # Создание таблицы Cameras
    step("""
        CREATE TABLE Cameras (
            "cameraID" uuid PRIMARY KEY,
            "address" character varying,
            "location" character varying,
            "specificationsID" uuid REFERENCES Specifications("specificationsID"),
            "organizationID" uuid REFERENCES Organizations("organizationID")
        );
    """),

    # Создание таблицы Events
    step("""
    CREATE TABLE Events (
        "eventID" uuid PRIMARY KEY,
        "dateTime" timestamp NOT NULL,
        "imgID" character varying,
        "note" character varying,
        "isImportant" boolean NOT NULL,
        "labels" json,
        "cameraID" uuid REFERENCES Cameras("cameraID")
    );
    """),
]

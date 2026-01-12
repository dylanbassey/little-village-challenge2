BEGIN TRANSACTION;

CREATE TABLE Outbound
(
    id              INT NOT NULL IDENTITY (1,1),
    estDispatchDate DATE,
    location        VARCHAR(30),
    category        VARCHAR(30),
    organisation    VARCHAR(100),
    paymentReceived DECIMAL(10, 2),
    deliveryAddress VARCHAR(255),
    deliveryMethod  VARCHAR(255),
    contact         VARCHAR(255),
    completed       VARCHAR(1),

    PRIMARY KEY (id)
);

CREATE TABLE Inbound
(
    id                   INT NOT NULL IDENTITY (1,1),
    location             VARCHAR(30),
    category             VARCHAR(30),
    supplierOrganisation VARCHAR(100),
    invoiceNumber        VARCHAR(50),
    paymentMethod        VARCHAR(10),
    amount               DECIMAL(10, 2),
    description          VARCHAR(255),
    advertisedLvEvent    VARCHAR(1),
    contact              VARCHAR(255),
    notes                VARCHAR(255),
    postcode             VARCHAR(10),
    lvTransportReq       VARCHAR(1),
    expDeliveryDate      DATE,
    thankyouSent         VARCHAR(1),
    thankyouInitial      VARCHAR(1),
    usagePlan            VARCHAR(80),
    PRIMARY KEY (id)
);

CREATE TABLE WeightRecord
(
    id         INT NOT NULL IDENTITY (1,1),
    category   VARCHAR(30),
    name       VARCHAR(25),
    inboundId  INT NULL,
    outboundId INT NULL,
    entryDate  DATE,

    PRIMARY KEY (id),
    FOREIGN KEY (inboundId) REFERENCES Inbound(id),
    FOREIGN KEY (outboundId) REFERENCES Outbound(id),
);

CREATE TABLE ContainerTypes
(
    id            INT NOT NULL IDENTITY (1,1),
    containerName VARCHAR(15),
    weight        INT,
    PRIMARY KEY (id)
);

CREATE TABLE Container
(
    id          INT NOT NULL IDENTITY (1,1),
    parentId    INT,
    typeId      INT,
    grossWeight DECIMAL(10, 2),
    PRIMARY KEY (id, parentId, typeId),
    FOREIGN KEY (parentId) REFERENCES WeightRecord (id),
    FOREIGN KEY (typeId) REFERENCES ContainerTypes (id)
);

CREATE TABLE Tags
(
    id       INT NOT NULL IDENTITY (1,1),
    parentId INT,
    name     VARCHAR(50),
    PRIMARY KEY (id),
    FOREIGN KEY (parentId) REFERENCES Inbound (id)
);

CREATE TABLE OutboundItems
(
    id       INT NOT NULL IDENTITY (1,1),
    parentId INT,
    category VARCHAR(100),
    quantity INT,

    PRIMARY KEY (id, parentId),
    FOREIGN KEY (parentId) REFERENCES Outbound (id)
);

COMMIT;
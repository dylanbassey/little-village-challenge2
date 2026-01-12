BEGIN TRANSACTION;

-- Insert into ContainerTypes
INSERT INTO ContainerTypes (containerName, weight) VALUES ('Box', 5);
INSERT INTO ContainerTypes (containerName, weight) VALUES ('Crate', 10);

-- Insert into Inbound
DECLARE @inbound1Id INT;
DECLARE @inbound2Id INT;

INSERT INTO Inbound (location, category, supplierOrganisation, invoiceNumber, paymentMethod, amount, description, advertisedLvEvent, contact, notes, postcode, lvTransportReq, expDeliveryDate, thankyouSent, thankyouInitial, usagePlan)
VALUES ('Warehouse A', 'Electronics', 'SupplierX', 'INV123', 'Card', 1000.00, 'First batch', 'Y', 'John Doe', 'Urgent', '12345', 'N', '2024-07-01', 'Y', 'J', 'Internal');

SET @inbound1Id = SCOPE_IDENTITY();

INSERT INTO Inbound (location, category, supplierOrganisation, invoiceNumber, paymentMethod, amount, description, advertisedLvEvent, contact, notes, postcode, lvTransportReq, expDeliveryDate, thankyouSent, thankyouInitial, usagePlan)
VALUES ('Warehouse B', 'Furniture', 'SupplierY', 'INV124', 'Cash', 500.00, 'Second batch', 'N', 'Jane Smith', 'Normal', '54321', 'Y', '2024-07-05', 'N', 'S', 'External');

SET @inbound2Id = SCOPE_IDENTITY();

-- Insert into Outbound
DECLARE @outbound1Id INT;
DECLARE @outbound2Id INT;

INSERT INTO Outbound (estDispatchDate, location, category, organisation, paymentReceived, deliveryAddress, deliveryMethod, contact, completed)
VALUES ('2024-07-10', 'Warehouse A', 'Electronics', 'CustomerA', 1200.00, '123 Main St', 'Courier', 'Alice', 'N');

SET @outbound1Id = SCOPE_IDENTITY();

INSERT INTO Outbound (estDispatchDate, location, category, organisation, paymentReceived, deliveryAddress, deliveryMethod, contact, completed)
VALUES ('2024-07-12', 'Warehouse B', 'Furniture', 'CustomerB', 700.00, '456 Side St', 'Pickup', 'Bob', 'Y');

SET @outbound2Id = SCOPE_IDENTITY();

-- Insert into WeightRecord
DECLARE @wr1Id INT;
DECLARE @wr2Id INT;
DECLARE @wr3Id INT;

INSERT INTO WeightRecord (category, name, inboundId, outboundId, entryDate)
VALUES ('Electronics', 'Batch1', 1, NULL, '2024-06-30');

SET @wr1Id = SCOPE_IDENTITY();

INSERT INTO WeightRecord (category, name, inboundId, outboundId, entryDate)
VALUES ('Furniture', 'Batch2', 2, 2, '2024-07-04');

SET @wr2Id = SCOPE_IDENTITY();

INSERT INTO WeightRecord (category, name, inboundId, outboundId, entryDate)
VALUES ('Electronics', 'Batch3', NULL, 1, '2024-07-09');

SET @wr3Id = SCOPE_IDENTITY();

-- Insert into Container
INSERT INTO Container (parentId, typeId, grossWeight) VALUES (@wr1Id, 1, 50.0);
INSERT INTO Container (parentId, typeId, grossWeight) VALUES (@wr2Id, 2, 80.0);

-- Insert into Tags
INSERT INTO Tags (parentId, name) VALUES (@inbound1Id, 'Fragile');
INSERT INTO Tags (parentId, name) VALUES (@inbound2Id, 'Heavy');

-- Insert into OutboundItems
INSERT INTO OutboundItems (parentId, category, quantity) VALUES (@outbound1Id, 'Laptop', 10);
INSERT INTO OutboundItems (parentId, category, quantity) VALUES (@outbound2Id, 'Chair', 20);


COMMIT;
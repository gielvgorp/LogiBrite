import { addDays, format } from 'date-fns';

const today = format(new Date(), 'dd-MM-yyyy');
const tomorrow = format(addDays(new Date(), 1), 'dd-MM-yyyy');

export const MOCK_USERS: User[] = [
    {
        id: 1,
        name: "Giel van Gorp",
        email: "gielvgorp123@gmail.com",
        role: "Chauffeur", 
        avatar: "https://www.crucial.com.au/wp-content/uploads/2014/07/example-person.png"
    },
    {
        id: 2,
        name: "Rik Engels",
        email: "rikengels@gmail.com",
        role: "Chauffeur", 
        avatar: "https://www.crucial.com.au/wp-content/uploads/2014/07/example-person.png"
    },
]

export const MOCK_ROUTES: Route[] = [
    {
        id: 123456,
        driverId: 1,
        date: today,
        startMileage: 250,
        depotLocation: "Vogelwikke 15, Venray",
        name: "Zeeland",
        endOdometer: 0,
        fuelAdded: 0,
        startOdometer: 0,
        status: "",
        pallets: 1,
        rollerCart: 2,
        isLocked: true,
        car: {
            id: 1,
            licencePlate: "VBN-82-F",
            model: "Mercedes Vito",
            type: "Service bus"
        },
        stops: [
            {
                id: "1",
                stopNumber: 1,
                scheduledTime: "09:00",
                status: 'In behandeling',
                isCompleted: false,
                proofOfDelivery: {
                    timestamp: ""
                },
                deliveryNote: "Links van het huis de oprit oprijden. Dan helemaal doorrijden naar achteren. Daar staat een chalet. Daar aanbellen.",
                items: [
                    {
                        id: 1,
                        itemName: "Kratten",
                        quantity: 5
                    },
                {
                         id: 2,
                        itemName: "BVM",
                        quantity: 21
                    },
                    {
                        id: 3,
                        itemName: "Middel BBQ",
                        quantity: 1
                    },
                    {
                        id: 4,
                        itemName: "Gasfles",
                        quantity: 1
                    }
                ],
                customer: {
                    id: 1,
                    name: "Henk Janssen",
                    address: "Stationstraat 1A",
                    city: "Amsterdam",
                    zipCode: "1234AB",
                    phoneNumber: "06 12345678"
                }
            },
            {
                id: "2",
                stopNumber: 2,
                scheduledTime: "09:11",
                status: 'In behandeling',
                isCompleted: false,
                proofOfDelivery: {
                    timestamp: ""
                },
                deliveryNote: "",
                items: [
                    {
                        id: 1,
                        itemName: "Kratten",
                        quantity: 10
                    },
                {
                         id: 2,
                        itemName: "BVM",
                        quantity: 4
                    },
                    {
                        id: 3,
                        itemName: "Middel BBQ",
                        quantity: 2
                    },
                    {
                        id: 4,
                        itemName: "Grote BBQ",
                        quantity: 1
                    },
                    {
                        id: 5,
                        itemName: "Gasfles",
                        quantity: 3
                    }
                ],
                customer: {
                    id: 1,
                    name: "Saskia van Doorn",
                    address: "Westsingel 25",
                    city: "Amsterdam",
                    zipCode: "1234AB",
                    phoneNumber: "06 12345678"
                }
            }
        ]
    },
    {
        id: 654321,
        driverId: 1,
        pallets: 0,
        startMileage: 0,
        rollerCart: 3,
        isLocked: true,
        date: tomorrow,
        depotLocation: "Vogelwikke 15, Venray",
        name: "Ardennen",
        endOdometer: 0,
        fuelAdded: 0,
        startOdometer: 0,
        status: "",
         car: {
            id: 1,
            licencePlate: "V-52-FGH",
            model: "Mercedes Sprinter",
            type: "Bezorg bus"
        },
        stops: [
            {
                id: "1",
                stopNumber: 1,
                scheduledTime: "09:00",
                status: 'In behandeling',
                isCompleted: false,
                proofOfDelivery: {
                    timestamp: ""
                },
                deliveryNote: "Links van het huis de oprit oprijden. Dan helemaal doorrijden naar achteren. Daar staat een chalet. Daar aanbellen.",
                items: [
                    {
                        id: 1,
                        itemName: "Kratten",
                        quantity: 5
                    },
                {
                         id: 2,
                        itemName: "BVM",
                        quantity: 21
                    },
                    {
                        id: 3,
                        itemName: "Middel BBQ",
                        quantity: 1
                    },
                    {
                        id: 4,
                        itemName: "Gasfles",
                        quantity: 1
                    }
                ],
                customer: {
                    id: 1,
                    name: "Henk Janssen",
                    address: "Stationstraat 1A",
                    city: "Amsterdam",
                    zipCode: "1234AB",
                    phoneNumber: "06 12345678"
                }
            }
        ]
    }
]
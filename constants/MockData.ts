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
                    name: "Giel van Gorp",
                    address: "Vogelwikke 13",
                    city: "Venray",
                    zipCode: "5803 LL",
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
                    address: "Raadhuisstraat 1",
                    city: "Venray",
                    zipCode: "5801 MA",
                    phoneNumber: "06 12345678"
                }
            },
{
    id: "3",
    stopNumber: 3,
    scheduledTime: "09:25",
    status: 'In behandeling',
    isCompleted: false,
    proofOfDelivery: {
        timestamp: ""
    },
    deliveryNote: "Achterom via steeg, aanbellen bij schuur.",
    items: [
        { id: 1, itemName: "Kratten", quantity: 3 },
        { id: 2, itemName: "BVM", quantity: 10 },
        { id: 4, itemName: "Gasfles", quantity: 2 }
    ],
    customer: {
        id: 3,
        name: "Tessa de Boer",
        address: "Dorpsstraat 89",
        city: "Zaandam",
        zipCode: "1506AE",
        phoneNumber: "06 87654321"
    }
},
{
    id: "4",
    stopNumber: 4,
    scheduledTime: "09:43",
    status: 'In behandeling',
    isCompleted: false,
    proofOfDelivery: {
        timestamp: ""
    },
    deliveryNote: "Levering bij receptie, achteringang gebruiken.",
    items: [
        { id: 1, itemName: "Kratten", quantity: 12 },
        { id: 3, itemName: "Middel BBQ", quantity: 1 },
        { id: 5, itemName: "Grote BBQ", quantity: 1 }
    ],
    customer: {
        id: 4,
        name: "Jeroen Visser",
        address: "Julianalaan 14",
        city: "Haarlem",
        zipCode: "2012ES",
        phoneNumber: "06 33445566"
    }
},
{
    id: "5",
    stopNumber: 5,
    scheduledTime: "10:05",
    status: 'In behandeling',
    isCompleted: false,
    proofOfDelivery: {
        timestamp: ""
    },
    deliveryNote: "Parkeerplaats voor de deur, bellen bij aankomst.",
    items: [
        { id: 2, itemName: "BVM", quantity: 15 },
        { id: 3, itemName: "Middel BBQ", quantity: 2 }
    ],
    customer: {
        id: 5,
        name: "Anouk Meijer",
        address: "Kennemerstraatweg 45",
        city: "Alkmaar",
        zipCode: "1815DA",
        phoneNumber: "06 99887766"
    }
},
{
    id: "6",
    stopNumber: 6,
    scheduledTime: "10:26",
    status: 'In behandeling',
    isCompleted: false,
    proofOfDelivery: {
        timestamp: ""
    },
    deliveryNote: "Let op: steile oprit, voorzichtig parkeren.",
    items: [
        { id: 1, itemName: "Kratten", quantity: 7 },
        { id: 4, itemName: "Gasfles", quantity: 1 }
    ],
    customer: {
        id: 6,
        name: "Bastiaan de Groot",
        address: "Zuiddijk 102",
        city: "Purmerend",
        zipCode: "1441DA",
        phoneNumber: "06 22113344"
    }
},
{
    id: "7",
    stopNumber: 7,
    scheduledTime: "10:47",
    status: 'In behandeling',
    isCompleted: false,
    proofOfDelivery: {
        timestamp: ""
    },
    deliveryNote: "BBQ graag onder de carport zetten.",
    items: [
        { id: 5, itemName: "Grote BBQ", quantity: 1 },
        { id: 2, itemName: "BVM", quantity: 8 }
    ],
    customer: {
        id: 7,
        name: "Emma Bakker",
        address: "Rijnstraat 23",
        city: "Den Helder",
        zipCode: "1781BV",
        phoneNumber: "06 55667788"
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
        depotLocation: "Vogelwikke 15, 5803 LL Venray",
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
                    address: "Rue de la Gare 49",
                    city: "La Roche-en-Ardenne",
                    zipCode: "6980",
                    phoneNumber: "06 12345678"
                }
            }
        ]
    }
]
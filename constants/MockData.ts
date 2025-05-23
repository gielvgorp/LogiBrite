import { addDays, format } from 'date-fns';


const today = format(new Date(), 'yyyy-MM-dd');
const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');

export const MOCK_USER: User = {
    id: 1,
    name: "Giel van Gorp",
    email: "gielvgorp123@gmail.com",
    role: "Chauffeur", 
    avatar: ""
}

export const MOCK_ROUTE: Route[] = [
    {
        id: 123456,
        driverId: 1,
        date: today,
        depotLocation: "Vogelwikke 15, Venray",
        name: "Zeeland",
        stops: [
            {
                id: "1",
                stopNumber: 1,
                scheduledTime: "09:00",
                status: 'In behandeling',
                deliveryNote: "Links van het huis de oprit oprijden. Dan helemaal doorrijden naar achteren. Daar staat een chalet. Daar aanbellen.",
                items: [
                    {
                        itemName: "Kratten",
                        quantity: 5
                    },
                    {
                        itemName: "BVM",
                        quantity: 21
                    },
                      {
                        itemName: "Middel BBQ",
                        quantity: 1
                    },
                    {
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
    },
    {
        id: 654321,
        driverId: 1,
        date: tomorrow,
        depotLocation: "Vogelwikke 15, Venray",
        name: "Zeeland",
        stops: [
            
        ]
    }
]
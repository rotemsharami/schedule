
export function getData() {


    const data = {
        ProjectName:"Balagan Festival 2023",
        "activeities": [
            {
                "id": "1",
                "title": "Bachata Workshop 2023",
                "type": "3",
                "start": "2023-01-22 13:00",
                "end": "2023-01-22 16:00",
                "location": "1",
                "description": "Bachata Workshop",
                "image": "https://elsolfestival.pl/wp-content/uploads/2018/11/daniel-desiree.jpg"
            },
            {
                "id": "2",
                "title": "Salsa Workshop",
                "type": "3",
                "start": "2023-01-22 11:00",
                "end": "2023-01-22 13:00",
                "location": "1",
                "description": "Bachata Workshop",
                "image": "https://elsolfestival.pl/wp-content/uploads/2018/11/daniel-desiree.jpg"
                
            },
            {
                "id": "3",
                "title": "Lunch",
                "type": "4",
                "start": "2023-01-22 12:30",
                "end": "2023-01-22 14:00",
                "location": "4",
                "description": "Bachata Workshop",
                "image": "https://resizer.otstatic.com/v2/photos/wide-large/3/26272322.jpg"    
            },
    
            {
                "id": "4",
                "title": "Registration",
                "type": "0",
                "start": "2023-01-22 11:00",
                "end": "2023-01-22 15:00",
                "location": "0",
                "description": "Checking & Rooms reseption",
                "image": "https://otelms.com/wp-content/uploads/2019/12/hotel-guest-registration-system.jpg"
                
            },
    
            {
                "id": "5",
                "title": "Checkout",
                "type": "0",
                "start": "2023-01-23 08:00",
                "end": "2023-01-23 10:00",
                "location": "0",
                "description": "Bachata Workshop",
                "image": "https://elsolfestival.pl/wp-content/uploads/2018/11/daniel-desiree.jpg"
                
            },
    

            {
                "id": "6",
                "title": "Final Party",
                "type": "2",
                "start": "2023-01-23 14:00",
                "end": "2023-01-23 15:00",
                "location": "0",
                "description": "Final Party",
                "image": "https://elsolfestival.pl/wp-content/uploads/2018/11/daniel-desiree.jpg"
                
            },

    
    
    
        ],
        "locations":[
            {
                id: 0,
                title: "Lobi",
                latlon: "24.34443369, 26.33365558888",
                
            },
            {
                "id":1,
                "title": "Hall 1",
                latlon: "24.34443369, 26.33365558888",
            },
            {
                "id":2,
                "title": "Hall 2",
                latlon: "24.34443369, 26.33365558888",
            },
            {
                "id":3,
                "title": "Hall 3",
                latlon: "24.34443369, 26.33365558888",
            },
            {
                "id":4,
                "title": "Dining Room",
                latlon: "24.34443369, 26.33365558888",
            },
    
        ],
        "activity_type":[
            {
                "id":0,
                "title": "Hotel"
            },
            {
                "id":1,
                "title": "Shows"
            },
            {
                "id":2,
                "title": "Parties"
            },
            {
                "id":3,
                "title": "Workshops"
            },
    
            {
                "id":4,
                "title": "Food"
            },
    
    
        ]
        
    
    
    }








    let data2 = {
        ProjectName: "Balagan Festival",
        "activities":[
            {
                id: 1,
                title: "Registration",
                image: "",
                description: "Starting the hot weekend, with jumping pool party",
                location: "Leonardo resort pool",
                latlon: "24.34443369, 26.33365558888",
                time: "10/9/2023 12:00 - 10/9/2023 16:00",
                type: 1,
            },
            {
                id: 2,
                title: "Opening Party",
                image: "",
                description: "Starting the hot weekend, with jumping pool party",
                location: "Leonardo resort pool",
                latlon: "24.333333369, 26.333688888",
                time: "10/9/2023 14:00 - 10/9/2023 18:00",
                type: 2,
            },
            {
                id: 3,
                title: "Lunch",
                image: "",
                description: "",
                location: "Leonardo Resort dining room",
                latlon: "24.333333369, 26.333688888",
                time: "10/9/2023 13:00 - 10/9/2023 15:00",
                type: 1,
            },
            {
                id: 4,
                title: "Dinner",
                image: "",
                description: "",
                location: "Leonardo Resort dining room",
                latlon: "24.333333369, 26.333688888",
                time: "10/9/2023 19:30 - 10/9/2023 21:00",
                type: 1,
            },





        ]
    };
    return data;
}
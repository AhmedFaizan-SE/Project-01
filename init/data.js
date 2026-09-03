const sampleListings = [
    {
        title: "Luxury Villa",
        description: "A beautiful luxury villa with a private pool and amazing views.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        price: 1200,
        location: "California",
        country: "USA"
    },
    {
        title: "Modern Apartment",
        description: "A modern apartment located in the heart of the city.",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
        price: 850,
        location: "New York",
        country: "USA"
    },
    {
        title: "Beach House",
        description: "Relax in this beautiful house located right next to the beach.",
        image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
        price: 1500,
        location: "Miami",
        country: "USA"
    },
    {
        title: "Mountain Cabin",
        description: "A peaceful wooden cabin surrounded by beautiful mountains.",
        image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8",
        price: 650,
        location: "Aspen",
        country: "USA"
    },
    {
        title: "Cozy Cottage",
        description: "A cozy cottage perfect for a peaceful weekend getaway.",
        image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
        price: 500,
        location: "Vermont",
        country: "USA"
    },
    {
        title: "City Penthouse",
        description: "A luxurious penthouse with a beautiful city skyline view.",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
        price: 2200,
        location: "Chicago",
        country: "USA"
    },
    {
        title: "Lake House",
        description: "A relaxing lake house with stunning views of the water.",
        image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
        price: 1100,
        location: "Michigan",
        country: "USA"
    },
    {
        title: "Desert Retreat",
        description: "A modern retreat surrounded by beautiful desert landscapes.",
        image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
        price: 900,
        location: "Arizona",
        country: "USA"
    },
    {
        title: "Forest House",
        description: "A peaceful house surrounded by trees and nature.",
        image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8",
        price: 700,
        location: "Oregon",
        country: "USA"
    },
    {
        title: "Modern Beach Villa",
        description: "A stylish villa with direct access to a beautiful beach.",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
        price: 1800,
        location: "Hawaii",
        country: "USA"
    },
    {
        title: "Downtown Loft",
        description: "A spacious loft apartment close to restaurants and shopping.",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        price: 950,
        location: "Boston",
        country: "USA"
    },
    {
        title: "Countryside Home",
        description: "A comfortable home surrounded by peaceful countryside.",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
        price: 600,
        location: "Texas",
        country: "USA"
    },
    {
        title: "Modern Farmhouse",
        description: "A beautiful farmhouse combining traditional and modern design.",
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
        price: 1000,
        location: "Nashville",
        country: "USA"
    },
    {
        title: "Riverside Cabin",
        description: "A charming cabin located beside a peaceful river.",
        image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8",
        price: 550,
        location: "Montana",
        country: "USA"
    },
    {
        title: "Luxury Mansion",
        description: "A large luxury mansion with spacious rooms and a private garden.",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
        price: 3500,
        location: "Los Angeles",
        country: "USA"
    },
    {
        title: "Seaside Apartment",
        description: "A bright apartment overlooking the ocean.",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        price: 1250,
        location: "San Diego",
        country: "USA"
    },
    {
        title: "Hilltop Villa",
        description: "A stunning villa situated on top of a peaceful hill.",
        image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
        price: 1600,
        location: "San Francisco",
        country: "USA"
    },
    {
        title: "Small Studio",
        description: "A simple and comfortable studio apartment for travelers.",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        price: 400,
        location: "Seattle",
        country: "USA"
    },
    {
        title: "Garden Villa",
        description: "A beautiful villa with a large private garden.",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
        price: 1300,
        location: "Orlando",
        country: "USA"
    },
    {
        title: "Snowy Mountain Lodge",
        description: "A warm and comfortable lodge perfect for winter vacations.",
        image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c",
        price: 1400,
        location: "Colorado",
        country: "USA"
    },
    {
        title: "Tropical Villa",
        description: "A relaxing tropical villa surrounded by palm trees.",
        image: "https://images.unsplash.com/photo-1582610116397-edb318620f90",
        price: 1900,
        location: "Florida",
        country: "USA"
    },
    {
        title: "Historic House",
        description: "A charming historic house with classic architecture.",
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
        price: 750,
        location: "Boston",
        country: "USA"
    },
    {
        title: "Luxury Condo",
        description: "A modern condo with excellent facilities and city views.",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
        price: 1150,
        location: "Dallas",
        country: "USA"
    },
    {
        title: "Wooden Retreat",
        description: "A peaceful wooden retreat perfect for nature lovers.",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
        price: 680,
        location: "Maine",
        country: "USA"
    },
    {
        title: "Oceanfront Home",
        description: "A beautiful home with spectacular ocean views.",
        image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
        price: 2100,
        location: "Malibu",
        country: "USA"
    },
    {
        title: "Modern City House",
        description: "A stylish house located close to the city center.",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
        price: 1000,
        location: "Austin",
        country: "USA"
    },
    {
        title: "Peaceful Lake Villa",
        description: "A beautiful villa overlooking a quiet lake.",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
        price: 1350,
        location: "Wisconsin",
        country: "USA"
    },
    {
        title: "Luxury Country Estate",
        description: "A large country estate with beautiful surroundings.",
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
        price: 2500,
        location: "Virginia",
        country: "USA"
    },
    {
        title: "Coastal Cottage",
        description: "A small cottage close to the ocean and local attractions.",
        image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
        price: 800,
        location: "Maine",
        country: "USA"
    },
    {
        title: "Luxury Mountain Villa",
        description: "A luxurious villa with breathtaking mountain scenery.",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
        price: 2000,
        location: "Utah",
        country: "USA"
    }
];

module.exports = {data: sampleListings};
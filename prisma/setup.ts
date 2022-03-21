import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const companies = [
    {
        name: "Delta Group",
        photo: "https://freesvg.org/img/institution_icon.png",
        location: "Tirane",
        description: "Kompania Deutschcolor pjesë e DELTA GROUP, sjell në Shqipëri traditën Gjermane 100-vjeçare në prodhimin e bojërave për ambjente të brendshme dhe të jashtme."
    },
    {
        name: "Vodafone",
        photo: "https://freesvg.org/img/Best-seller-stamp.png",
        location: "Tirane",
        description: "Kompania R&T shpk kërkon të punësojë përfaqsues shitjesh për Dyqan VODAFONE në qytetin e Durresit."
    },
    {
        name: "Future Home",
        photo: "https://freesvg.org/img/Sale.png",
        location: "Durres",
        description: "Pozicion i lire pune si konsulent imobiliar. Te interesuarit te na kontaktojne ne adresen e emailit."
    },
    {
        name: "Go Tech Shpk",
        photo: "https://freesvg.org/img/Black-And-White-Calculator.png",
        location: "Tirane",
        description: "GoTech shpk, shoqeri shqiptare ne objekt te saj tregtimin me shumice dhe pakice te pajisjeve elektroshtepiake kerkon te punesoje:Financiere"
    },
    {
        name: "Hotel Adriatik",
        photo: "https://freesvg.org/img/Hotel-Information.png",
        location: "Durres",
        description: "Hotel Adriatk kerkon te punesoje punonjes energjitik dhe te perkushtuar"
    },
    {
        name: "Pespa Albania",
        photo: "https://freesvg.org/img/Sale.png",
        location: "Durres",
        description: "Pespa kerkon te punesoje menaxher ne departamentin e shitjes"
    },
    {
        name: "Restorant 4 Stinet",
        photo: "https://freesvg.org/img/1466872420.png",
        location: "Durres",
        description: "Restorant 4 Stinet kerkon te punesoje kuzhinier"
    }
]

async function createStuff() {
    for (const company of companies) {
        await prisma.company.create({ data: company })
    }
}

createStuff()
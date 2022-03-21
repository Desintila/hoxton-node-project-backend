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


const jobs = [
    {
        title: "Audit Finance",
        description: "Auditues i brendshem i sitemeve financare",
        companyId: 1,
        location: "Tirane",
        dateCreated: "21.03.2022",
        salary: 600,
        userId: 3
    },
    {
        title: "Perfaqesues Shitje",
        description: "Perfaqesues shitje dyqan Vodafone",
        companyId: 2,
        location: "Durres",
        dateCreated: "05.03.2022",
        salary: 400,
        userId: 1
    },
    {
        title: "Konsulent Imobiliar",
        description: "Konsulent Imobiliar ne Vollga",
        companyId: 3,
        location: "Durres",
        dateCreated: "15.03.2022",
        salary: 450,
        userId: 4
    },
    {
        title: "Financiere",
        description: "Financiere ne sektorin e shitjeve",
        companyId: 4,
        location: "Tirane",
        dateCreated: "18.03.2022",
        salary: 500,
        userId: 3
    },
    {
        title: "Reception",
        description: "Front Desk",
        companyId: 5,
        location: "Durres",
        dateCreated: "20.03.2022",
        salary: 550,
        userId: 1
    },
    {
        title: "Grafik Design",
        description: "Vend pune Grafik Design",
        companyId: 6,
        location: "Durres",
        dateCreated: "10.03.2022",
        salary: 700,
        userId: 4
    },
    {
        title: "Manager",
        description: "Menaxher ne departamentin e shitjes",
        companyId: 6,
        location: "Durres",
        dateCreated: "12.03.2022",
        salary: 400,
        userId: 3
    },
    {
        title: "Kuzhinier",
        description: "Kuzhiner tek 4 Stinet",
        companyId: 7,
        location: "Durres",
        dateCreated: "14.03.2022",
        salary: 550,
        userId: 1
    }
]

async function createStuff() {
    for (const company of companies) {
        await prisma.company.create({ data: company })
    }
    for (const job of jobs) {
        await prisma.jobs.create({ data: job })
    }
}

createStuff()

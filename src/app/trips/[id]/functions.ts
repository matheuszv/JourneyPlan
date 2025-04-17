import { FormEvent } from "react"


interface TripsPlans{
    id: string;
    local: string;
    ownerName: string;
    ownerEmail: string;
    dayStart: Date;
    dayEnd: Date;
    emailsInvite: string;
    links: string | null;
    password: string;
}


export async function setNewLink(event: FormEvent<HTMLFormElement>, travelPlans: TripsPlans | null){
        event.preventDefault()
        
        const data = new FormData(event.currentTarget)

        const title = data.get('title')?.toString()
        const url = data.get('url')?.toString()
        const key = data.get('key')?.toString()

        if(travelPlans?.password != key){
            return
        }

        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/createlinks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: travelPlans?.id,
                title,
                url,
                link: travelPlans?.links
            })
        })

        if(result.ok){
            window.location.reload()
        }
    }

export async function setNewEmail(event: FormEvent<HTMLFormElement>, travelPlans: TripsPlans | null){
    event.preventDefault()
        
    const data = new FormData(event.currentTarget)

    const newEmail = data.get('email')?.toString()
    const key = data.get('key')?.toString()

    if(travelPlans?.password != key){
        return
    }

    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/createtrip`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: travelPlans?.id,
            newEmail,
            emails: travelPlans?.emailsInvite
        })
    })
    if(result.ok){
        window.location.reload()
    }
}


export async function setNewActivie(event: FormEvent<HTMLFormElement>, travelPlans: TripsPlans | null){
    event.preventDefault()

    const data = new FormData(event.currentTarget)
  
    const title = data.get('title')?.toString()
    const occurs_at = data.get('occurs_at_day')?.toString()
    const occurs_at_time = data.get('occurs_at_time')?.toString()
    const key = data.get('key')?.toString()

    if(travelPlans?.password != key){
        return
    }
       
    if(!occurs_at_time || title=='' || !title || !occurs_at || !travelPlans){
        return
    }

    const [year, month, day] = occurs_at.split("-").map(Number);
    const date = new Date(year, month - 1, day); // isso cria no horário local (sem UTC)
    
    if(date < travelPlans?.dayStart || date > travelPlans?.dayEnd){
        return
    }
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/createactivities`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        id: travelPlans?.id,
            title,
            occurs_at,
            occurs_at_time,
        })
    });
    if(result.ok){
        window.location.reload()
    }
}


export async function setMadeActivitie(id: string, activitieId: string){
   
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/createactivities`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        id: id,
        activitieId,
        })
    });
    if(result.ok){
        window.location.reload()
    }
}
import { format } from "date-fns"
import { MapPin, Calendar, User} from "lucide-react"

interface LocalDateTrip{
    destination: string | undefined,
    dayStart: Date,
    dayEnd: Date,
    ownerName: string | undefined,
}

export function LocalDateTrip({destination, dayStart, dayEnd, ownerName}: LocalDateTrip){

    const displayDate = `${format(dayStart, "LLL dd, y")} to ${format(dayEnd, "LLL dd, y")}`

    return (
        <div className="px-4 h-16 rounded-xl bg-zinc-900 flex items-center justify-between max-md:text-sm">
            <div className="flex items-center gap-2">
                <MapPin className="size-5 text-zinc-400"></MapPin>
                <span className="text-zinc-100 max-md:text-sm">{destination}</span>
            </div>
            <div className="flex gap-2 items-center max-md:hidden">
                <div className="flex items-center gap-2">
                    <User className="size-5 text-zinc-400"/>
                    <span className="text-zinc-100 text-base ">{ownerName}</span>
                </div>
            </div>
            <div className="flex gap-6 items-center">
                <div className="flex items-center gap-2">
                    <Calendar className="size-5 text-zinc-400"/>
                    <span className="text-zinc-100 text-base max-md:text-sm"> {displayDate}</span>
                </div>
            {/* <div className="w-px h-6 bg-zinc-800" />
                <button className="bg-zinc-800 rounded-lg px-5 py-2 flex items-center gap-1 hover:bg-zinc-700">
                    Alterar local/data<Settings2/>
                </button> */}
            </div>
        </div>
    )
}
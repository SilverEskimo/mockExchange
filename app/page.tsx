import "bootstrap/dist/css/bootstrap.min.css"
import { redirect } from 'next/navigation'

export default function SummaryOrLogin() {
        
	return (
        redirect("/home")
	)
}

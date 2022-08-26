import { gql, useQuery } from '@apollo/client';
import {util} from "@apollo/protobufjs";
import float = util.float;

const GET_CAFE = gql`
    query GetCafe {
        cafes {
            name
            menus {
                name
                prise
            }   
            assesment
            image
        }
    }
`

interface CafeAll {
    name: string,
    menus: string[],
    assesment: float,
    image?: string
}

export default function All (){
    const { data, loading, error } = useQuery(GET_CAFE)
    if( loading ) return <p>loading...</p>
    if( error ) return <p>error has occured</p>
    const { cafes } = data
    return (
        <main>
            <div>
               <h1>Hello this is all info</h1>
                <div id='cafes'>
                    { cafes.map((cafe: CafeAll) => (
                        <div>Name: {cafe.name} / assesment: {cafe.assesment}</div>
                    ))}
                </div>
            </div>
        </main>
    )
}
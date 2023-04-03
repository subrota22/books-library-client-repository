
import { ListItem } from '@mui/material'
import Carousel from 'react-material-ui-carousel'

function Example()
{
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

    return (
        <Carousel>
            {
                items.map( (item, i) => <ListItem key={i} /> )
            }
        </Carousel>
    )
}


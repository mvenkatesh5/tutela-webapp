import { SlateEditor } from "@components/SlateEditor"
import { RenderSlateContent } from "@lib/utils"
import { useState } from "react"
import { Rating } from "react-simple-star-rating"

const BehaviorView = ({ reports }: any) => {
    const [rating, setRating] = useState<any>()

    // Catch Rating value
    const handleRating = (rate: number) => {
        setRating(rate)
    }
    return <div className="mt-3">
        <div className="my-5"><Rating initialValue={rating} size={20} onClick={handleRating} /></div>
        {reports.map((item: any, index: any) => (
            <div
                key={index}
                className="my-5"
            >
                {item.title && <h4>{item.title}</h4>}

                {item?.behavior?.content && (
                    <div className="my-2">
                        {RenderSlateContent(item?.behavior?.content) && (
                            <div>
                                <SlateEditor
                                    readOnly={true}
                                    initialValue={RenderSlateContent(item?.behavior?.content)}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        ))}</div>
}

export default BehaviorView
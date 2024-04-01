import { SlateEditor } from "@components/SlateEditor"
import { RenderSlateContent } from "@lib/utils"

const SyllabusView = ({ reports }: any) => {
    return <div className="mt-3">
        {reports.map((item: any, index: any) => (
            <div
                key={index}
                className="my-5"
            >
                {item.title && <h4>{item.title}</h4>}

                {item?.syllabus?.content && (
                    <div className="my-2">
                        {RenderSlateContent(item?.syllabus?.content) && (
                            <div>
                                <SlateEditor
                                    readOnly={true}
                                    initialValue={RenderSlateContent(item?.syllabus?.content)}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        ))}</div>
}

export default SyllabusView
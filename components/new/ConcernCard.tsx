// next imports
import Link from "next/link";

function NewsCard({ data }: any) {
  return (
    <>
      <Link href={data.link ? data.link : "#"}>
        <a target="_blank">
          <div className="border-bottom p-3">
            <p className="fw-bold text-dark mb-2">{data.title}</p>
            <small className="fw-light text-secondary mb-0">
              {data.reply} {data.reply == 1 ? "reply" : "replies"}
            </small>
          </div>
        </a>
      </Link>
    </>
  );
}

export default NewsCard;

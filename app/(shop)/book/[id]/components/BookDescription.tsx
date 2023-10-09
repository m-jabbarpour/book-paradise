interface Props {
  title: string;
  description: string;
  summary: string;
}

const BookDescription: React.FC<Props> = ({ title, description, summary }) => {
  return (
    <div className="bg-3">
      <section className="container py-8">
        <div>
          <h2 className="text-sm sm:text-xl dark:text-slate-200 font-bold mb-4">
            معرفی کتاب {title}
          </h2>
          <p className="text-sm sm:text-base leading-6 sm:leading-8 text-justify text-gray-600 dark:text-gray-300 mb-4">
            {description}
          </p>
        </div>
        <div>
          <h2 className="text-sm sm:text-xl dark:text-slate-200 font-bold mb-4">
            بخش‌هایی از کتاب {title}
          </h2>
          <p className="text-sm sm:text-base leading-6 sm:leading-8 text-justify text-gray-600 dark:text-gray-300 mb-4">
            {summary}
          </p>
        </div>
      </section>
    </div>
  );
};

export default BookDescription;

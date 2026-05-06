function CategoryCard({
  title,
  color,
}) {

  return (
    <div
      className="h-40 rounded-[30px] flex items-end p-6 text-3xl font-bold cursor-pointer hover:scale-105 transition"
      style={{
        background: color,
      }}
    >
      {title}
    </div>
  )
}

export default CategoryCard
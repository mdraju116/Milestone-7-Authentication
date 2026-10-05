/* 

=>first change the navlinks: 
href={item.slug} to  href={ `/category-details/${item.slug}`}


 <div className=" flex justify-center gap-4 mt-3 ">
                <Link href={"/"} className=" hover:bg-blue-400 hover:text-white p-1 rounded">হোম</Link>
                {
                    filteredItems.map((item, index) => (
                        <Link href={ `/category-details/${item.slug}`} key={index} className=" hover:bg-green-500 hover:text-white p-1 rounded">{item.title}</Link>
                    ))
                }
  </div>


  =>then create dynamic route and page.tsx
    category/[categoryid]/page.tsx

*/
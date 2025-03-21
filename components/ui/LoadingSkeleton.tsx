interface LoadingSkeletonSchema {
  length?: number;
}

const LoadingSkeleton = ({ length = 5 }: LoadingSkeletonSchema) => {
  return (
    <tbody className='w-full'>
      {Array.from({ length }).map((_, index) => (
        <tr key={index} className='animate-pulse bg-gray-100 dark:bg-gray-800'>
          <td className='px-6 py-3'>
            <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-32'></div>
          </td>
          <td className='px-6 py-3'>
            <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-20'></div>
          </td>
          <td className='px-6 py-3'>
            <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-40'></div>
          </td>
          <td className='px-6 py-3'>
            <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-24'></div>
          </td>
          <td className='px-6 py-3'>
            <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-20'></div>
          </td>
          <td className='px-6 py-3'>
            <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-32'></div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default LoadingSkeleton;

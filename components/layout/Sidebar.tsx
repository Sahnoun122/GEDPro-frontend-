// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// // import { cn } from '@/utils/helpers';

// const navigation = [
//   { name: 'Dashboard', href: '/dashboard', icon: '📊' },
//   { name: 'Candidats', href: '/candidats', icon: '👥' },
//   { name: 'Documents', href: '/documents', icon: '📄' },
//   { name: 'Entretiens', href: '/entretiens', icon: '📅' },
//   { name: 'Formulaires', href: '/formulaires', icon: '📝' },
//   { name: 'Utilisateurs', href: '/utilisateurs', icon: '👤' },
// ];

// export function Sidebar() {
//   const pathname = usePathname();

//   return (
//     <div className="flex flex-col w-64 bg-gray-800">
//       <div className="flex items-center h-16 px-4">
//         <h1 className="text-xl font-bold text-white">GED RH</h1>
//       </div>
      
//       <nav className="flex-1 px-2 py-4 space-y-1">
//         {navigation.map((item) => {
//           const isActive = pathname.startsWith(item.href);
          
//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={cn(
//                 'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
//                 isActive
//                   ? 'bg-gray-900 text-white'
//                   : 'text-gray-300 hover:bg-gray-700 hover:text-white'
//               )}
//             >
//               <span className="mr-3">{item.icon}</span>
//               {item.name}
//             </Link>
//           );
//         })}
//       </nav>
      
//       <div className="p-4 border-t border-gray-700">
//         <div className="flex items-center">
//           <div className="text-sm text-white">
//             <p className="font-medium">Utilisateur</p>
//             <p className="text-gray-400">user@company.com</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { Admin } from '../models/admin';

export function renderAdmin(admin: Admin) {
  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    created_at: admin.createdAt,
  };
}
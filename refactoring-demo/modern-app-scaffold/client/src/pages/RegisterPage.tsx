import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/Input/Input';
import { Button } from '../components/Button/Button';
import { register } from '../api/auth';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter no mínimo 2 caracteres';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      // Store token in localStorage
      localStorage.setItem('token', response.token);

      // Redirect to login page
      navigate('/login');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao registrar usuário. Tente novamente.';
      setSubmitError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Criar nova conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{' '}
            <a
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              faça login em uma conta existente
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {submitError && (
            <div
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
              role="alert"
            >
              {submitError}
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <Input
              name="name"
              type="text"
              label="Nome"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Seu nome completo"
              required
            />
            <Input
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="seu@email.com"
              required
            />
            <Input
              name="password"
              type="password"
              label="Senha"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Mínimo 6 caracteres"
              required
            />
            <Input
              name="confirmPassword"
              type="password"
              label="Confirmar Senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="Digite a senha novamente"
              required
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="w-full"
            >
              Registrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Head } from "@inertiajs/react";
import { AlertCircle, Settings } from "lucide-react";
import { Form } from "@/Components/shared/Form";
import useAuth from "./hooks/useAuth";

export default function Index() {
  const { login } = useAuth();
  const { data, setData, submit, errors, processing } = login;

  return (
    <>
      <Head title="Home" />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{ backgroundColor: 'var(--institutional-blue)' }}
              >
                <Settings className="w-8 h-8 text-white" />
              </div>

              <h1 className="text-2xl text-gray-900 mb-2">
                DFD Digital – SEDUC-AM
              </h1>
              <p className="text-sm text-gray-600">
                Sistema de Formalização de Demandas de TI
              </p>
            </div>

            {/* Form */}
            <Form onSubmit={submit} className="space-y-5">
              {/* Identifier */}
              <div className="space-y-2">
                <Label htmlFor="identifier">Email ou Matrícula</Label>
                <Input
                  id="identifier"
                  value={data.identifier}
                  onChange={(e) => setData('identifier', e.target.value)}
                  disabled={processing}
                  className="h-11"
                />
                {errors.identifier && (
                  <p className="text-sm text-red-600">{errors.identifier}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  disabled={processing}
                  className="h-11"
                />
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Erro geral (opcional) */}
              {errors.form && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.form}</AlertDescription>
                </Alert>
              )}

              {/* Remember */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={data.remember}
                  onCheckedChange={(checked) =>
                    setData('remember', Boolean(checked))
                  }
                  disabled={processing}
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Manter conectado
                </Label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={processing}
                className="w-full h-11"
                style={{ backgroundColor: 'var(--institutional-blue)' }}
              >
                {processing ? 'Entrando...' : 'Entrar'}
              </Button>
            </Form>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Secretaria de Estado de Educação e Desporto Escolar
          </p>
        </div>
      </div>
    </>
  );
}

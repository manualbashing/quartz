---
title: pkg_resources deprecation warning in Azure CLI is breaking Azure Pipelines
date: 2025-06-13T13:34:18
socialImage: pg_resources-fail.png
socialDescription: A userWarning in Azure CLI caused by setuptools currently fails Azure Pipeline tasks that have failOnStderr set to true. This can be fixed by pinning setuptools to a specific version.
---

Recently I saw Azure Pipelines that use Azure CLI starting to fail with the following error message:

```text
##[error]/opt/az/azcliextensions/azure-devops/azext_devops/dev/__init__.py:5: 
UserWarning: pkg_resources is deprecated as an API. 
See [https://setuptools.pypa.io/en/latest/pkg_resources.html.](https://setuptools.pypa.io/en/latest/pkg_resources.html.) 
The pkg_resources package is slated for removal as early as 2025-11-30. 
Refrain from using this package or pin to Setuptools<81.
```

> [!note] 🤔
> This is by the way not specific to the Azure CLI extension for azure-devops. Is saw the same warning on my client when I tried to access a storage account.

Technically it is not an error but a mere user warning, yet Azure Pipelines often has no way of telling the difference. So if you have your pipeline tasks set to `failOnStderr=true`, the task fails when the above warning occurs.

The root of the warning is `setuptools`, a python package that is used by Azure CLI. As the error message already suggests a workaround to the current issue is to pin the `setuptools` package to a version below `81.*`, for example to `80.8.0`.

To fix this you need to make sure that the python environment in which Azure CLI runs has the correct version of `setuptools` installed:

```bash
pythonPath=$(az --version  | grep "Python location" | sed -e 's/Python location //' -e "s/'//g")
"$pythonPath" -m pip install setuptools==80.8.0 --force-reinstall --ignore-installed
```

For PowerShell (7.5.1+, both Windows and Linux) the workaround looks like this:

```powershell
$pythonPath = (az --version) -match 'Python location' -replace "^.*'([^']+)'", '$1'
&"$pythonPath" -m pip install setuptools==80.8.0 --force-reinstall --ignore-installed
```

In order to apply this workaround to your failing pipeline, add the following task before your first task in which Azure CLI is used.

```yaml
- task: Bash@3
      name: install_setuptools
      displayName: 'Fix setuptools dependency for AzureCLI'
      inputs:
        targetType: 'inline'
        script: |
          pythonPath=$(az --version  | grep "Python location" | sed -e 's/Python location //' -e "s/'//g")
          "$pythonPath" -m pip install setuptools==80.8.0 --force-reinstall --ignore-installed
```

This issue is expected to be fixed with the next release of Azure CLI (`1.75.0`) in early July 2025.

**Source**: https://github.com/azure/azure-cli/issues/31591